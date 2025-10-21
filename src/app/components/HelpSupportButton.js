import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { colors } from '../styles/colors';

export default function HelpSupportButton({ style }) {
  const [visible, setVisible] = useState(true);
  const router = useRouter();

  const goToDonations = () => router.push('/donations');

  if (!visible) return null;

  return (
    <div style={{ position: 'fixed', right: 20, bottom: 20, zIndex: 1500, ...style }}>
      <div style={{
        width: 320,
        background: 'white',
        borderRadius: 12,
        boxShadow: '0 12px 30px rgba(0,0,0,0.18)',
        padding: 16,
        border: '1px solid #eee',
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: colors.primary, flex: 1 }}>Help support independent artists</div>
        </div>

        <div style={{ fontSize: 14, color: colors.textPrimary, lineHeight: 1.3 }}>
          Help independent musicians keep creating music you love — donate to support their work. Your contribution helps with recording, equipment, and touring.
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, alignItems: 'center' }}>
          <button onClick={() => setVisible(false)} style={{ background: 'transparent', border: 'none', color: colors.textSecondary, cursor: 'pointer' }}>Dismiss</button>
          <div style={{ flex: 1 }} />
          <button onClick={goToDonations} style={{ background: colors.primary, color: 'white', border: 'none', borderRadius: 8, padding: '8px 12px', cursor: 'pointer' }}>Donate</button>
        </div>
      </div>
    </div>
  );
}
