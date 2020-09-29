const redis = require('ioredis')

function doTheWork() {
    console.log('Trying to connect...')

    const client = new redis({
        sentinels: [
            {
                host: 'sentinel',
                port: 26379,
            },
            {
                host: 'sentinel',
                port: 26380,
            },
            {
                host: 'sentinel',
                port: 26381,
            }
        ],
        name: "mymaster",
        password: 'some-good-password'
    }
    )

    client.on('connect', () => {
        console.log('Connected succesfully!')

        setInterval(async () => {
            console.log('Incrementing!')

            await client.incr('foo')

            const result = await client.get('foo')

            console.log(`The result is: ${result}`)
        }, 1000)
    })

    client.on('error', (e) => {
        console.log('Could not connect!')
        console.log(e)
    })
}

doTheWork()