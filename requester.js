(async () => {

    const body = JSON.stringify({
        username: "Test"
    })

    const result = await fetch("http://localhost:3001/users", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body
})

console.log(await result.json())
})()
