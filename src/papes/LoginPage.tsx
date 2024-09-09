import axios from 'axios'
import React, { useState } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f0f0;
`

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`

const Input = styled.input`
  margin-bottom: 1rem;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`

const Button = styled.button`
  padding: 0.5rem;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`

interface LoginPageProps {
  onLogin: () => void
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    try {
      const formData = new FormData()
      formData.append('username', username)
      formData.append('password', password)

      const response = await axios.post(`http://localhost:8091/api/login`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      if (response.status === 200) {
        onLogin()
        navigate('/')
      } else {
        alert('로그인 실패')
      }
    } catch (error) {
      console.error('로그인 요청 중 오류 발생:', error)
      alert('로그인 실패')
    }
  }

  return (
    <LoginContainer>
      <LoginForm onSubmit={handleSubmit}>
        <h2>로그인</h2>
        <Input type="text" placeholder="아이디" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <Input type="password" placeholder="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <Button type="submit">로그인</Button>
      </LoginForm>
    </LoginContainer>
  )
}

export default LoginPage
