function BrandIcon({ className = 'h-6 w-6', src }) {
  const maskStyles = {
    WebkitMaskImage: `url("${src}")`,
    WebkitMaskPosition: 'center',
    WebkitMaskRepeat: 'no-repeat',
    WebkitMaskSize: 'contain',
    maskImage: `url("${src}")`,
    maskPosition: 'center',
    maskRepeat: 'no-repeat',
    maskSize: 'contain',
  }

  return (
    <span
      aria-hidden="true"
      className={`inline-block shrink-0 bg-current ${className}`}
      style={maskStyles}
    />
  )
}

export default BrandIcon
