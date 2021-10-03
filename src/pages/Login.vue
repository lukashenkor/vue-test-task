<template>
  <div class="content">
    <div class="login">
      <div class="login__header">
        <h4>Авторизация</h4>
      </div>
      <div class="login__body">
        <input
          class="login__body_login"
          type="text"
          placeholder="Логин"
          v-model="login"
          v-on:keydown.enter="auth"
          @input="checkValid"
        >
        <div class="alert" v-if="loginErrorMessages && loginErrorMessages.length">
          <p v-for="alert in loginErrorMessages" :key="alert">{{ alert }}</p>
        </div>
        <input
          class="login__body_password"
          type="password"
          placeholder="*****"
          v-model="password"
          v-on:keydown.enter="auth"
          @input="checkValid"
        >
        <p class="alert auth-message" v-if="authMessage">{{ authMessage }}</p>
        <button @click="auth">Войти</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Login',
  data () {
    return {
      login: null,
      loginErrorMessages: null,
      password: null,
      authMessage: null,
      clearMessageTimeout: null
    }
  },
  methods: {
    async auth () {
      if (!this.login || !this.password) {
        this.authMessage = 'Все поля должны быть заполнены'
        return this.setClearTimeout
      }
      if (this.loginErrorMessages && this.loginErrorMessages.length) {
        this.authMessage = 'Проверьте корректность введенных данных'
        return this.setClearTimeout
      }
      try {
        const getUser = await axios.get(`http://localhost:3000/users?login=${this.login}&password=${this.password}`)
        if (getUser.data && getUser.data.length) {
          sessionStorage.setItem('isAuthed', true)
          this.$router.push('/')
        } else {
          this.authMessage = 'Неверный логин или пароль'
        }
      } catch (e) {
        alert('Проблема с отправкой запроса на http://localhost:3000')
      }
    },
    setClearTimeout () {
      if (this.clearMessageTimeout) {
        clearTimeout(this.clearMessageTimeout)
      }

      this.clearMessageTimeout = setTimeout(() => {
        this.authMessage = ''
      }, 5000)
    },
    checkValid () {
      if (!this.login) {
        this.loginErrorMessages = []
        return
      }

      const alerts = []
      const letters = /^[A-za-z]+$/
      if (this.login.length > 20) {
        alerts.push('Длина логина не должна превышать')
      }
      if (!this.login.match(letters)) {
        alerts.push('Логин может состоять только из латинских букв')
      }
      this.loginErrorMessages = alerts
    }
  }
}
</script>

<style scoped>
.content {
  background-color: #bbb6ff;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Comic Sans MS";
}

.login {
  width: 300px;
  border: 1px solid;
  margin: auto;
  display: flex;
  flex-direction: column;
  background-color: #2F2F2F;
  border-radius: 5px;
}

.login__header, .login__body {
  width: 100%;
  margin: 0 auto;
}

.login__header {
  height: 70px;
  background-color: #000;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}

.login__body {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  width: 80%;
}

.login__body input {
  margin-bottom: 10px;
}

.login__body_login,
.login__body_password {
  font-size: 20px;
  border-radius: 3px;
  border: none;
  color: #000;
  padding: 5px 5px;
}

.login__body input::placeholder {
  color: #000;
}

.login__body button {
  border-radius: 3px;
  margin: 20px 0;
  height: 30px;
  border: none;
  background-color: #E8E8E8;
  font-size: 20px;
  transition: background-color .2s;
}

.login__body button:hover {
  cursor: pointer;
  background-color: #d5d5d5;
}

.alert {
  color: #ff8e8e;

}

.auth-message {
  text-align: center;
}
</style>
