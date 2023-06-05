const socket = new WebSocket('ws://localhost:3000');

socket.onmessage= message => {
    const el = document.createElement('li')
    el.innerHTML = message.data;
    document.querySelector('ul').appendChild(el);
}

document.addEventListener("DOMContentLoaded", () => {
    document.querySelector('input').onkeyup=(e)=>{
        if(e.keyCode==13){
            document.querySelector('button').click()
        }
    }
    
    document.querySelector('button').onclick = () => {
        const text = document.querySelector('input').value;
        socket.send(text);
        document.querySelector('input').value = ''
    }
});

