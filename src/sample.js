import './tailwind.css'
import './magnifying-glass.png'

import * as mockroblog from './mockroblog.js'
window.mockroblog = mockroblog

const searchForm = document.querySelector('#search')
const keyword = document.querySelector('#keyword')

const resultDiv = document.querySelector('#results')
const result = document.querySelector('#result-value')

async function search (term = '') {
  const query = encodeURIComponent(`%%${term}%%`)
  const response = await fetch(`http://localhost:5000/posts/?text=${query}`)
  const data = await response.json()

  result.textContent = JSON.stringify(data.resources, null, 2)
  resultDiv.hidden = !term
}

searchForm.addEventListener('submit', (event) => {
  event.preventDefault()
})

keyword.addEventListener('input', (event) => {
  search(keyword.value)
})
