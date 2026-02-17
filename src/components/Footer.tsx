import React from 'react'

const Footer = () => {
  return (
      <footer className="border-t border-border bg-card/50">
        <div className="container mx-auto px-4 sm:px-6 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="font-mono text-xs text-muted-foreground uppercase tracking-wide text-center sm:text-left">
              BeamDrop &bull; Open Source File Server &bull; <a href="https://github.com/ekilie/beamdrop/blob/main/LICENSE" className="text-primary hover:underline transition-colors" target="_blank" rel="noopener noreferrer">AGPL-3.0</a>
            </p>
            <p className="font-mono text-xs text-muted-foreground uppercase tracking-wide">
              Crafted by <a href="https://github.com/tacheraSasi" className="text-primary hover:underline transition-colors" target="_blank" rel="noopener noreferrer">Tachera Sasi</a> &bull; <a href="https://github.com/ekilie" className="text-primary hover:underline transition-colors" target="_blank" rel="noopener noreferrer">ekilie</a>
            </p>
          </div>
        </div>
      </footer>
  )
}

export default Footer
