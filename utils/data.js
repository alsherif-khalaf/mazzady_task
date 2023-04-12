// it should be work as follows and store the PRIVATE_KEY in .env to be secure : 
// const thePrivateKey = process.env.API_PRIVATE_KEY;
// but it seems that the key has '_;' and this breaks  nextjs .env loading
// so i used the key directly as follows , but it should be changed to be more secure

const thePrivateKey = '3%o8i}_;3D4bF]G5@22r2)Et1&mLJ4?$@+16'

function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


export const getAllCats = async () => {
    const response = await fetch('https://staging.mazaady.com/api/v1/get_all_cats', {
      headers: {
        'private-key': thePrivateKey
      }
    });
    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }
    const jsonData = await response.json();

    return jsonData;
  }


  export const getSubCategoryProperties = async (cat) => {
      const response = await fetch(`https://staging.mazaady.com/api/v1/properties?cat=${cat}`, {
        headers: {
          'private-key': thePrivateKey
        }
      });
      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }
      const jsonData = await response.json();
      return jsonData;
    }

  export const getOptionsChild = async (ID) => {
      const response = await fetch(`https://staging.mazaady.com/api/v1/get-options-child/${ID}`, {
        headers: {
          'private-key': thePrivateKey
        }
      });
      if (!response.ok) {
        throw new Error("Failed to fetch categories");
      }
      const jsonData = await response.json();
      return jsonData;
    }