const formCadastro = document.getElementById('formCadastro')
const msg = document.getElementById('mensagem')
const tabela = document.getElementById('tabelaUsuarios')


async function atualizarTabela() {
    const res = await fetch('/api/usuarios')
    const usuarios = await res.json()

    const tbody = tabela.querySelector('tbody');  
    tbody.innerHTML = ''; 

    usuarios.forEach( u => {
        const row = document.createElement('tr')
        row.innerHTML = `
        <td>${u.nome}</td>
        <td>${u.email}</td>
        <td>${u.idade}</td>
        `
        tbody.appendChild(row)
    });
}


formCadastro.addEventListener('submit', async (e) =>{
    e.preventDefault()

    const formData = {
        nome: formCadastro.nome.value,
        email: formCadastro.email.value,
        idade: formCadastro.idade.value
    }

    try{
        const response = await fetch('/api/enviar',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(formData)
        })

        const data = await response.json()
        msg.innerHTML = `<p style="color:green">${data.mensagem}</p> `
        formCadastro.reset()
        await atualizarTabela()
        setTimeout(() =>{

            window.location.reload()
        }, 2000)

    } catch (error){
        msg.innerHTML = `<p style="color:red">Erro ao enviar os dados!</p>`
        console.log('Erro:', error)
    }
})

atualizarTabela()
