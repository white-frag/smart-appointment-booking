import React from 'react';
import { AlertTriangle } from 'lucide-react';

const ConfigWarning: React.FC = () => {
  return (
    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <AlertTriangle className="h-5 w-5 text-yellow-400" />
        </div>
        <div className="ml-3">
          <p className="text-sm text-yellow-700">
            <strong>Demo Mode:</strong> This application is running in demo mode because Supabase credentials are not configured. 
            To enable full functionality, please set up your Supabase environment variables.
          </p>
          <div className="mt-2 text-sm text-yellow-700">
            <p>Create a <code className="bg-yellow-100 px-1 rounded">.env</code> file with:</p>
            <pre className="mt-1 bg-yellow-100 p-2 rounded text-xs">
              VITE_SUPABASE_URL=your_supabase_url_here<br/>
              VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfigWarning; 