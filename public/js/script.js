const sucess = document.querySelector('.success-message')
const danger = document.querySelector('.danger-message')
const btn = document.querySelector('.btn')

btn.addEventListener('click', () => {
    if(btn.parentElement == sucess){
        sucess.style.display = 'none'
    } else if (btn.parentElement == danger){
        danger.style.display =  'none'
    }
})