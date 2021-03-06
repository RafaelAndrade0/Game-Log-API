# GameLog API

<p align="center">
  <a href="" rel="noopener">
 <img width=400px height=400px src="https://user-images.githubusercontent.com/30444471/71687312-4c72ad80-2d7c-11ea-8bb9-1621a77a94e1.png" alt="Logo do Projeto"></a>
</p>

---

<p align="center"> API desenvolvida em NodeJs para ser consumida pelo <a href="https://github.com/RafaelAndrade0/GameLog-App">GameLog App</a>
    <br> 
</p>

# ⛏️ EndPoints

## 🎮 Games

### GET All Games

```
GET api/v1/games
```

```
GET api/v1/developers/:developerId/games
```

Retorna uma lista de todos games e/ou uma lista de todos games referente a um developer específico

### GET Single Game

```
GET api/v1/games/:id
```

Retorna um unico game

### ADD Game

```
POST api/v1/games
```

Adiciona um game

### DELETE Game

```
DELETE api/v1/games/:id
```

Deleta um game

### UPDATE Game

```
PUT api/v1/games/:id
```

Atualiza o registro de um game

### UPLOAD Game Photo

```
PUT api/v1/games/:id/photo
```

Upload de foto referente ao game

## 👨🏻‍💻Developers

### GET All Developers

```
GET api/v1/developers
```

Retorna uma lista de todos developers

### GET Single Developer

```
GET api/v1/developer/:id
```

Retorna um unico developer

### ADD Developer

```
POST api/v1/developer
```

Adiciona um developer

### DELETE Developer

```
DELETE api/v1/developer/:id
```

Deleta um game

### UPDATE Developer

```
PUT api/v1/developer/:id
```

Atualiza o registro de um developer

## ⭐ Reviews

### GET All Reviews

```
GET api/v1/reviews
```

```
GET api/v1/games/:gameId/reviews
```

Retorna uma lista de todos reviews e/ou uma lista de todos reviews referente a um game específico

### ADD Review

```
POST api/v1/review
```

Adiciona um review

### GET Single Review

```
GET api/v1/review/:id
```

Retorna um único review

### DELETE Review

```
DELETE api/v1/review/:id
```

Deleta um review

## 👦 Users

### REGISTER User

```
POST api/v1/auth/register
```

Registra um usuário

### LOGIN User

```
GET api/v1/auth/Login
```

Realiza o login do usuário

### LOGOUT User

```
GET api/v1/auth/logout
```

Realiza o logout do usuário

### GET Current User

```
GET api/v1/auth/me
```

Retorna o usuário atual

### FORGOT Password

```
POST api/v1/auth/forgotpassword
```

Operação de "Esqueceu a senha?"

### RESET Password

```
PUT api/v1/auth/resetpassword/:resettoken
```

Reseta a senha do usuário
