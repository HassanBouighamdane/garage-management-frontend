
export const addClient=async(data)=>{
    try {
        /*
        await axios.post('http://localhost:8080/api/v1/clients', formData);
        onSave(); // Notify the parent component to refresh the list
        onClose(); // Close the form
        */
       console.log("added successfully")
    } catch (error) {
        console.error('There was an error adding the client!', error);
    }
};

export const getAllClients = async () => {
    try {
        const response = await fetch("/mockApi/clients.json"); // Corrected path to start from public/
        if (!response.ok) {
            throw new Error('Failed to fetch clients');
        }

        const data = await response.json();
        
        // Ensure that data is an array
        if (!Array.isArray(data)) {
            throw new Error('Fetched data is not an array');
        }

        console.log(data);
        return data; // This should be an array
    } catch (error) {
        console.error('There was an error fetching the clients!', error);
        return [];  // Return an empty array in case of error
    }
};
