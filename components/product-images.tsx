import Image from 'next/image';
import { useState, useEffect } from 'react';

interface ProductImagesProps {
  imagesFolder: string;
}

export const ProductImages = ({ imagesFolder }: ProductImagesProps) => {
  const [imageList, setImageList] = useState<string[]>([]);
  
  useEffect(() => {
    // Limpa a lista para evitar repetições
    setImageList([]);
    
    // Simplifica o caminho da pasta
    const path = imagesFolder.startsWith('/') ? imagesFolder : `/${imagesFolder}`;
    
    // Tenta carregar as imagens em diferentes formatos
    const checkImages = async () => {
      const uniqueImages = new Set<string>();
      const extensions = ['png', 'jpg', 'webp'];
      
      // Primeiro tenta carregar o thumbnail
      try {
        const response = await fetch(`${path}/thumbnail.png`, { method: 'HEAD' });
        if (response.ok) {
          uniqueImages.add(`${path}/thumbnail.png`);
        }
      } catch (e) {
        // Ignora erros
      }
      
      // Depois carrega as imagens numeradas
      for (let i = 1; i <= 10; i++) {
        const paddedNumber = String(i).padStart(2, '0');
        
        for (const ext of extensions) {
          const imagePath = `${path}/${paddedNumber}.${ext}`;
          
          try {
            const response = await fetch(imagePath, { method: 'HEAD' });
            if (response.ok) {
              uniqueImages.add(imagePath);
              // Se encontrou uma imagem com esse número, pode pular para o próximo
              break;
            }
          } catch (e) {
            // Ignora erros
          }
        }
      }
      
      // Converte o Set para Array e atualiza o estado
      setImageList(Array.from(uniqueImages));
    };
    
    checkImages();
  }, [imagesFolder]);
  
  // Renderiza a lista de imagens únicas
  return (
    <div className='md:sticky md:top-[96px] flex w-full flex-col'>
      {imageList.map((imageSrc) => (
        <div key={imageSrc} className='relative aspect-video w-full'>
          <Image
            src={imageSrc}
            alt='Imagem do produto'
            fill
            className='object-cover'
          />
        </div>
      ))}
    </div>
  );
}; 