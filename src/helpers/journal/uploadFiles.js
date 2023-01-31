

export const uploadFiles = async ( files ) => {
    if( !files ) throw new Error( 'Any file has been selected.');

    const cloudURL = 'https://api.cloudinary.com/v1_1/doq1nfuh2/upload'
    const formData = new FormData();
    formData.append( 'file', files );
    formData.append( 'upload_preset', 'journal-app' );


    try {

        const response = await fetch( cloudURL, {
            method: 'POST',
            body: formData,
        });

        if( !response.ok ) throw new Error( 'File failed to upload' );

        const cloudResponse = await response.json();

        return cloudResponse.secure_url;
        
    } catch (error) {
        throw new Error( error.message ),
        console.log( error )
    }

}