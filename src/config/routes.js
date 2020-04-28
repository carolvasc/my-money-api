const express = require('express')
const auth = require('./auth')

module.exports = function (server) {

    /* Rotas protegidas por Token JWT */
    const protectedApi = express.Router()
    server.use('/api', protectedApi)

    protectedApi.use(auth) // Filtro de autenticação

    const BillingCycle = require('../api/billingCycle/billingCycleService')
    BillingCycle.register(protectedApi, '/billingCycles')

    /* Rotas abertas */
    const openApi = express.Router()
    server.use('/oapi', openApi)

    const authService = require('../api/user/authService')
    openApi.post('/login', authService.login)
    openApi.post('/signup', authService.signup)
    openApi.post('/validateToken', authService.validateToken)
}