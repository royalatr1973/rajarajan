function ImagePlaceholder({ id, label, description, src }) {
  // If an image source is provided, render the image
  if (src) {
    return (
      <div className="img-placeholder has-image" data-image-id={id}>
        <img src={src} alt={label} />
      </div>
    )
  }

  // Otherwise, render the placeholder
  return (
    <div className="img-placeholder" data-image-id={id}>
      <svg
        className="img-placeholder-icon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
      </svg>
      <div className="img-placeholder-text">
        <strong>{id}</strong>
        <br />
        {label}
        {description && (
          <>
            <br />
            <span style={{ fontSize: '0.65rem', opacity: 0.7 }}>{description}</span>
          </>
        )}
      </div>
    </div>
  )
}

export default ImagePlaceholder
