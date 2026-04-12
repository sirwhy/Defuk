'use client';

import LobsterGenerator from '@/app/components/LobsterGenerator';

export default function LobsterTestPage() {
  return (
    <div className="min-h-screen bg-[#0a1929] text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-2 text-center">🦞 Lobster Pixel Generator Test</h1>
        <p className="text-gray-400 text-center mb-8">Programmatic pixel art generation - NOT hardcoded!</p>
        
        {/* Different Sizes */}
        <div className="grid grid-cols-4 gap-8 mb-12">
          <div className="text-center">
            <LobsterGenerator size="sm" colors={{
              lobsterRed: '#ff4500',
              lobsterOrange: '#ff6b35',
              clawPink: '#ffb6c1',
              legBrown: '#cc3700'
            }} />
            <div className="mt-2 text-sm text-gray-400">Small (12x12)</div>
          </div>
          
          <div className="text-center">
            <LobsterGenerator size="md" colors={{
              lobsterRed: '#ff4500',
              lobsterOrange: '#ff6b35',
              clawPink: '#ffb6c1',
              legBrown: '#cc3700'
            }} />
            <div className="mt-2 text-sm text-gray-400">Medium (16x16)</div>
          </div>
          
          <div className="text-center">
            <LobsterGenerator size="lg" colors={{
              lobsterRed: '#ff4500',
              lobsterOrange: '#ff6b35',
              clawPink: '#ffb6c1',
              legBrown: '#cc3700'
            }} />
            <div className="mt-2 text-sm text-gray-400">Large (20x20)</div>
          </div>
          
          <div className="text-center">
            <LobsterGenerator size="xl" colors={{
              lobsterRed: '#ff4500',
              lobsterOrange: '#ff6b35',
              clawPink: '#ffb6c1',
              legBrown: '#cc3700'
            }} />
            <div className="mt-2 text-sm text-gray-400">Extra Large (24x24)</div>
          </div>
        </div>
        
        {/* Different Colors */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Different Color Variants</h2>
          <div className="grid grid-cols-3 gap-8">
            <div className="text-center">
              <LobsterGenerator size="md" colors={{
                lobsterRed: '#ff4500',
                lobsterOrange: '#ff6b35',
                clawPink: '#ffb6c1',
                legBrown: '#cc3700'
              }} />
              <div className="mt-2 text-sm text-gray-400">Original</div>
            </div>
            
            <div className="text-center">
              <LobsterGenerator size="md" colors={{
                lobsterRed: '#e63946',
                lobsterOrange: '#f4a261',
                clawPink: '#ff6b9d',
                legBrown: '#8b4513'
              }} />
              <div className="mt-2 text-sm text-gray-400">Warm Variant</div>
            </div>
            
            <div className="text-center">
              <LobsterGenerator size="md" colors={{
                lobsterRed: '#4a90a4',
                lobsterOrange: '#6b8c9e',
                clawPink: '#87ceeb',
                legBrown: '#2f4f4f'
              }} />
              <div className="mt-2 text-sm text-gray-400">Cool Variant</div>
            </div>
          </div>
        </div>
        
        {/* Technical Details */}
        <div className="bg-[#1a2a3a] rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">📊 Technical Details</h2>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <strong>Generation Method:</strong><br />
              <code className="text-green-400">Programmatic</code> (not hardcoded SVG)
            </div>
            <div>
              <strong>Pixel Count:</strong><br />
              ~75-100 pixels per lobster
            </div>
            <div>
              <strong>Animation:</strong><br />
              Claw pincers open/close (±20°)
            </div>
            <div>
              <strong>Scalable:</strong><br />
              4 sizes: sm, md, lg, xl
            </div>
            <div>
              <strong>Customizable:</strong><br />
              Colors are props
            </div>
            <div>
              <strong>Anatomical:</strong><br />
              Head, thorax, 6-segment abdomen, claws, legs, tail
            </div>
          </div>
        </div>
        
        {/* Code Example */}
        <div className="bg-[#1a2a3a] rounded-lg p-6 mt-8">
          <h2 className="text-2xl font-bold mb-4">💻 Usage Example</h2>
          <pre className="text-xs bg-[#0a1929] p-4 rounded overflow-x-auto">
{`import LobsterGenerator from '@/app/components/LobsterGenerator';

<LobsterGenerator 
  size="lg"
  colors={{
    lobsterRed: '#ff4500',
    lobsterOrange: '#ff6b35',
    clawPink: '#ffb6c1',
    legBrown: '#cc3700'
  }}
/>

// Features:
// - Programmatically generated pixels
// - Animated claw pincers
// - Scalable sizes
// - Customizable colors
// - Anatomically correct structure`}
          </pre>
        </div>
      </div>
    </div>
  );
}
