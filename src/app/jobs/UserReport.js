export default {
    key: "UserReport",
    options: {
        limiter: {
            max: 1, // Maximo de tarefa pela duration
            duration: 1000 // Tempo para executar o max de tarefas
        },
        delay: 5000, // Tempo para realizar a tarefa
        attempts: 1 // Vezes de re-tentativa
    },
    async handle({ data }) {
        const { user } = dataa

       console.log(user);
    }
}