import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import BACKEND_URL from '../Backend';


export function Auth({ type }: { type: 'signin' | 'signup' }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()

  const handleAuth = async() => {
    if (type === 'signup') {
      // Handle signup logic here
      console.log('Signup:', { username, email, password });

      try {
        const response = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, {
            name: username,
            email,
            password
          })
          if (!response.data) {
            console.log("No response");
          }
        console.log(response.data);
        const token = localStorage.setItem("token", response.data.token);
        console.log(token);
        
        navigate('/blogs')

      } catch (error) {
        console.log(error);
        
      }


    } else {
      // Handle signin logic here
      console.log('Signin:', { email, password });
      try {
        const response = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, {
            
            email,
            password
          })
          if (!response.data) {
            console.log("No response");
          }
        console.log(response.data);
        const token = localStorage.setItem("token", response.data.token);
        console.log(token);
        
        navigate('/blogs')

      } catch (error) {
        console.log(error);
        
      }

    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <div className="flex flex-col mb-6">
          <h1 className="text-3xl font-extrabold mb-2">
            {type === 'signup' ? 'Create an account' : 'Sign in'}
          </h1>
          <div className="text-slate-500 mb-4">
            {type === 'signin' ? "Don't have an account?" : 'Already have an account?'}
            <Link className="pl-2 underline" to={type === 'signin' ? '/signup' : '/signin'}>
              {type === 'signin' ? 'Sign up' : 'Sign in'}
            </Link>
          </div>
        </div>
        <div className="space-y-4">
          {type === 'signup' ? 
            <InputComponents
              label="Username"
              placeholder="Enter username"
              type="text"
              onChange={(e) => setUsername(e.target.value)}
            />: null
          }
          <InputComponents
            label="Email"
            placeholder="Enter email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputComponents
            label="Password"
            placeholder="Enter password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          onClick={handleAuth}
          type="button"
          className="mt-8 w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5"
        >
          {type === 'signup' ? 'Sign up' : 'Sign in'}
        </button>
      </div>
    </div>
  );
}

interface InputProps {
  label: string;
  placeholder: string;
  type: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function InputComponents({ label, placeholder, type, onChange }: InputProps) {
  return (
    <div className="flex flex-col mb-4">
      <label className="text-lg font-medium mb-2 mt-2">{label}</label>
      <input
        onChange={onChange}
        className="w-full h-10 border-2 rounded text-slate-600 px-2"
        type={type}
        placeholder={placeholder}
      />
    </div>
  );
}
