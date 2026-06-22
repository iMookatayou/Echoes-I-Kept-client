const categoryTagStyles = {
  Pop: 'bg-[#F3E7EA] text-[#754555] ring-[#E5CFD6]',
  Alternative: 'bg-[#E4EAE7] text-[#40574F] ring-[#CDD9D4]',
  'R&B': 'bg-[#EAE5EF] text-[#584A66] ring-[#D8CFE1]',
}

export function getCategoryTagStyles(category) {
  return (
    categoryTagStyles[category] ||
    'bg-[#EFEEEB] text-[#4A4742] ring-[#DCD9D4]'
  )
}

const categoryTextStyles = {
  Pop: 'text-[#754555]',
  Alternative: 'text-[#40574F]',
  'R&B': 'text-[#584A66]',
}

export function getCategoryTextStyles(category) {
  return categoryTextStyles[category] || 'text-muted-foreground'
}
