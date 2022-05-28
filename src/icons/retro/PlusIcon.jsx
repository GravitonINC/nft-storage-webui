const PlusIcon = ({ color = 'white', gradient }) => {
  return <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id='ro' gradientTransform='rotate(35deg)' x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset='5.46%' stop-color='#FF7F69' />
        <stop offset='30.27%' stop-color='#FF2D83' />
        <stop offset='88.28%' stop-color='#6695FF' />
      </linearGradient>
    </defs>

    {
      gradient ? <>
        <rect x='49.5%' y='0' width='1' height='100%' stroke="url(#ro)" stroke-width="1" fill="none" />
        <rect x='0' y='50%' width='100%' height='1' stroke="url(#ro)" stroke-width="1" fill="none" />
      </> : <>
        <path d="M6.39961 1.20001V10.8" stroke={color} stroke-linecap="round" />
        <path d="M11.2002 6L1.60019 6" stroke={color} stroke-linecap="round" />
      </>
    }
  </svg>
}

export default PlusIcon
