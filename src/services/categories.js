export async function fetchCategories() {
    const token = localStorage.getItem('authUser'); 
    const parsedToken = token ? JSON.parse(token).id_token : null; 
  
    if (!parsedToken) {
      console.error('No se encontró id_token en el almacenamiento local');
      return [];
    }
  
    try {
      const response = await fetch('https://vu2ps1ry7c.execute-api.us-east-1.amazonaws.com/Prod/category', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${parsedToken}`, 
          'Content-Type': 'application/json'
        }
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error en la respuesta de la API:', errorText);
        throw new Error(`Error al obtener categorías: ${response.statusText}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error:', error);
      return [];
    }
  }
  