import React, { useState } from 'react';
import { X, QrCode } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { CyberButton } from '../CyberButton/CyberButton';

export const QRCodeGenerator = ({ isOpen, onClose, onGenerate }) => {
  const [url, setUrl] = useState('');
  const [generatedUrl, setGeneratedUrl] = useState('');

  if (!isOpen) return null;

  const handleGenerate = () => {
    if (url.trim()) {
      setGeneratedUrl(url);
    }
  };

  const handleOk = () => {
    if (generatedUrl) {
      onGenerate(generatedUrl);
      setUrl('');
      setGeneratedUrl('');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="panel-cyber w-full max-w-sm">
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
            <QrCode size={24} className="text-primary" />
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center gap-2 bg-input border border-border rounded-lg px-4 py-2">
            <QrCode size={16} className="text-muted-foreground" />
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Type your URL"
              className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
          </div>
          
          <CyberButton 
            variant="primary" 
            onClick={handleGenerate} 
            className="w-full"
          >
            Generate QR Code
          </CyberButton>
          
          {generatedUrl && (
            <div className="flex justify-center p-4 bg-card rounded-lg">
              <QRCodeSVG 
                value={generatedUrl} 
                size={150}
                bgColor="transparent"
                fgColor="#4ade80"
              />
            </div>
          )}
          
          <div className="flex gap-2">
            <CyberButton onClick={onClose} className="flex-1">
              Cancel
            </CyberButton>
            <CyberButton 
              variant="primary" 
              onClick={handleOk} 
              className="flex-1"
              disabled={!generatedUrl}
            >
              OK
            </CyberButton>
          </div>
        </div>
      </div>
    </div>
  );
};
