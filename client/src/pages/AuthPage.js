import React, { useState, useContext } from 'react'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'
import { useEffect } from 'react'
import { AuthContext } from '../context/AuthContext'


export const AuthPage = () => {
    const auth = useContext(AuthContext)
    const message = useMessage()
    const { loading, request, error, clearError } = useHttp()
    const [from, setFrom] = useState({
        email: '', password: ''
    })
  
  useEffect(() => {
    message(error)
    clearError()
  }, [error, message, clearError])
  
  useEffect(() => {
    window.M.updateTextFields()
  }, [])

    const changeHandler = event => {
        setFrom({ ...from, [event.target.name]: event.target.value })
    }
 
  const reqisterHandler = async () => {
    try {
      const data = await request('/api/auth/register', 'POST', { ...from })
      message(data.message)
    } catch (e) {}
  }

  const loginHandler = async () => {
    try {
      const data = await request('/api/auth/login', 'POST', { ...from })
      auth.login(data.token, data.userId)
    } catch (e) {}
  }


    return (
        <div className = 'row'>
            <div className = "col s6 offset-s3">
            <div className = "card blue darken-1">
        <div className = "card-content white-text">
          <span className = "card-title"> Авторизация </span>
        <div>
                            
            <div className = "input-field">
              <input placeholder = "Введите email"
                id = "email"
                type ="text"
                name="email" 
                value={from.email}    
                onChange = { changeHandler }  
                />              
                  <label htmlFor = "email"> Email </label>
            </div>                 
                            
             <div className = "input-field">               
              <input placeholder = "Введите пароль"
                    id = "password"
                    type = "password"
                    name="password"
                    value={from.password}
                    onChange = { changeHandler } 
                    />
                  <label htmlFor="email"> Пароль </label>
            </div>   
          
        </div>
        <div className = "card-action">
                <button className = "btn yellow darken-4"
                  style={{ marginRight: 10 }}
                  disabled={loading}
                  onClick={loginHandler}
                >
                  Войти
                  </button>
                <button className = "btn gtey lighren-1 black-text"
                  onClick={reqisterHandler}
                  disabled = {loading}>
                  Регистрация
                  </button>
        </div>
      </div>
            </div>
            </div>
            </div>
    )
}