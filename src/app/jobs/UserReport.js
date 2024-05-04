export default {
    key: "UserReport",
    options: {
        limiter: {
            max: 1,
            duration: 1000
        },
        delay: 5000,
        attempts: 1
    },
    async handle({ data }) {
        const { user } = data

       console.log(user);
    }
}