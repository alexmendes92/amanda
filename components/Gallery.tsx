import React, { useState } from 'react';
import { Heart, Lock, Plus } from 'lucide-react';
import { PhotoPost, UserRole } from '../types';

interface GalleryProps {
  currentUser: UserRole;
}

const Gallery: React.FC<GalleryProps> = ({ currentUser }) => {
  const [photos, setPhotos] = useState<PhotoPost[]>([
    { id: '1', url: 'https://picsum.photos/400/500?random=1', caption: 'Fim de semana perfeito em Ilhabela 🌊', likes: 1, likedByPartner: true, createdAt: '2 dias atrás' },
    { id: '2', url: 'https://picsum.photos/400/400?random=2', caption: 'Saudade desse dia!', likes: 0, likedByPartner: false, createdAt: '5 dias atrás' },
    { id: '3', url: 'https://picsum.photos/400/600?random=3', caption: 'Nossa pizza favorita 🍕', likes: 1, likedByPartner: true, createdAt: '1 semana atrás' },
  ]);

  const toggleLike = (id: string) => {
    setPhotos(photos.map(photo => {
      if (photo.id === id) {
        return {
          ...photo,
          likedByPartner: !photo.likedByPartner,
          likes: photo.likedByPartner ? photo.likes - 1 : photo.likes + 1
        };
      }
      return photo;
    }));
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Simulation of upload
    if (e.target.files && e.target.files[0]) {
      const newPost: PhotoPost = {
        id: Date.now().toString(),
        url: URL.createObjectURL(e.target.files[0]),
        caption: 'Nova memória ❤️',
        likes: 0,
        likedByPartner: false,
        createdAt: 'Agora mesmo'
      };
      setPhotos([newPost, ...photos]);
    }
  };

  return (
    <div className="h-full flex flex-col pb-20">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            Galeria Nossa
            <Lock className="w-4 h-4 text-slate-400" />
          </h2>
          <p className="text-xs text-slate-500">Só eu e você</p>
        </div>
        
        {currentUser === 'alex' && (
          <label className="bg-indigo-600 text-white p-3 rounded-full shadow-lg shadow-indigo-200 cursor-pointer hover:bg-indigo-700 transition-colors">
            <Plus className="w-5 h-5" />
            <input type="file" className="hidden" accept="image/*" onChange={handleUpload} />
          </label>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 overflow-y-auto no-scrollbar">
        {photos.map(photo => (
          <div key={photo.id} className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl mb-3">
              <img 
                src={photo.url} 
                alt="Memory" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-end p-4">
                 <p className="text-white text-sm font-medium">{photo.caption}</p>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <p className="text-sm font-medium text-slate-700">{photo.caption}</p>
              <button 
                onClick={() => toggleLike(photo.id)}
                className={`flex items-center gap-1 text-sm font-medium transition-colors ${photo.likedByPartner ? 'text-rose-500' : 'text-slate-400 hover:text-rose-400'}`}
              >
                <Heart className={`w-5 h-5 ${photo.likedByPartner ? 'fill-current' : ''}`} />
                {photo.likes > 0 && <span>{photo.likes}</span>}
              </button>
            </div>
            <p className="text-xs text-slate-400 mt-1">{photo.createdAt}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
