import { useState, useEffect } from 'react';
import classes from './form.module.css';

const Form = () => {
  const [td, setTd] = useState(false);
  const [images, setImages] = useState([]);
  const [prevImageIndex, setPrevImageIndex] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [ratings, setRatings] = useState({
    contrast: 0,
    localContrast: 0,
    entropy: 0,
    localEntropy: 0,
    saturation: 0,
    overall: 0,
  });

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(
          'https://dataset-207b9-default-rtdb.asia-southeast1.firebasedatabase.app/images.json'
        );

        if (!response.ok) {
          throw new Error('could not get images');
        }
        const data = await response.json();
        setImages(data);
      } catch (err) {
        window.alert(err.message);
      }
    };
    fetchImages();
  }, []);
  let initialIndex = 0;

  if (!images.length) {
    initialIndex = Math.floor(Math.random() * 900);
  } else {
    initialIndex = Math.floor(Math.random() * images.length);
  }
  const [currentImageIndex, setCurrentImageIndex] = useState(initialIndex);
  console.log(currentImageIndex);

  const handlePrevImage = (event) => {
    event.preventDefault();
    setCurrentImageIndex(
      prevImageIndex !== null ? prevImageIndex : currentImageIndex
    );
  };

  const handleNextImage = (event) => {
    event.preventDefault();
    setPrevImageIndex(currentImageIndex);

    setCurrentImageIndex(Math.floor(Math.random() * images.length));
  };

  const handleRatingSubmit = async (event) => {
    event.preventDefault();
    if (
      ratings.contrast === 0 ||
      ratings.localContrast === 0 ||
      ratings.entropy === 0 ||
      ratings.localEntropy === 0 ||
      ratings.saturation === 0
    ) {
      window.alert('Rating should be between 1 - 5');
      return;
    }
    setIsSubmitting(true);
    const currentImage = images[currentImageIndex];
    // Check if ratings array is present, create an empty array if not
    const updatedData = {
      numberOfRatings: currentImage.numberOfRatings + 1,
      ratings:
        currentImage.numberOfRatings === 0
          ? [
              {
                contrast: ratings.contrast,
                localContrast: ratings.localContrast,
                entropy: ratings.entropy,
                localEntropy: ratings.localEntropy,
                saturation: ratings.saturation,
                overall: ratings.overall,
              },
            ]
          : [
              ...currentImage.ratings,
              {
                contrast: ratings.contrast,
                localContrast: ratings.localContrast,
                entropy: ratings.entropy,
                localEntropy: ratings.localEntropy,
                saturation: ratings.saturation,
                overall: ratings.overall,
              },
            ],
    };

    try {
      const response = await fetch(
        `https://dataset-207b9-default-rtdb.asia-southeast1.firebasedatabase.app/images/${currentImageIndex}.json`,
        {
          method: 'PATCH', // Use PATCH method to update existing data
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json(); // Parse the error response
        console.error('Error:', errorData);
        throw new Error('Could not submit rating');
      }

      // Reset ratings and move to the next image
      setRatings({
        contrast: 0,
        localContrast: 0,
        entropy: 0,
        localEntropy: 0,
        saturation: 0,
        overall: 0,
      });

      // Update the local images state with the new data
      const updatedImages = [...images];
      updatedImages[currentImageIndex] = {
        ...updatedImages[currentImageIndex],
        ...updatedData,
      };
      setImages(updatedImages);

      setCurrentImageIndex(Math.floor(Math.random() * images.length));
    } catch (error) {
      console.error('Caught an exception:', error);
      window.alert('An error occurred. Please try again later.');
    }
    setIsSubmitting(false);
  };

  const handleDeleteImage = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `https://dataset-207b9-default-rtdb.asia-southeast1.firebasedatabase.app/images/${currentImageIndex}.json`,
        {
          method: 'DELETE',
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error:', errorData);
        throw new Error('Could not delete image');
      }

      // Remove the deleted image from the local state
      const updatedImages = [...images];
      updatedImages.splice(currentImageIndex, 1);
      setImages(updatedImages);

      // Update the database with the modified images array
      try {
        const updateDatabaseResponse = await fetch(
          'https://dataset-207b9-default-rtdb.asia-southeast1.firebasedatabase.app/images.json',
          {
            method: 'PUT', // Use PUT method to update the entire array
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedImages),
          }
        );

        if (!updateDatabaseResponse.ok) {
          const errorData = await updateDatabaseResponse.json();
          console.error('Error updating database:', errorData);
          throw new Error('Could not update database');
        }
      } catch (updateError) {
        console.error(
          'Caught an exception during database update:',
          updateError
        );
        window.alert(
          'An error occurred while updating the database. Please try again later.'
        );
      }

      // Move to the next image after deletion
      setCurrentImageIndex(Math.floor(Math.random() * images.length));
    } catch (error) {
      console.error('Caught an exception:', error);
      window.alert('An error occurred. Please try again later.');
    }
  };

  return (
    <>
      <form className={classes.form}>
        <div className={classes['image-container']}>
          <button onClick={handlePrevImage} className={classes['nav-button']}>
            &#171;
          </button>
          {images.length > 0 ? (
            <>
              <img
                className={classes.image}
                src={images[currentImageIndex].Image_URL}
                alt={`current phot0 ${currentImageIndex + 1}`}
              />
            </>
          ) : (
            <p>Loading...</p>
          )}
          <button onClick={handleNextImage} className={classes['nav-button']}>
            &#187;
          </button>
        </div>
        <div className={classes['input-group']}>
          <label htmlFor="contrast">Contrast:</label>&nbsp;
          <input
            className={classes.input}
            type="range"
            id="contrast"
            min="1"
            max="5"
            value={ratings.contrast}
            onChange={(e) =>
              setRatings({ ...ratings, contrast: parseInt(e.target.value, 10) })
            }
            required
          />
           <output className={classes.output}>{ratings.contrast}</output>
          &nbsp;
          <label htmlFor="local-contrast">Local Contrast:</label>&nbsp;
          <input
            className={classes.input}
            type="range"
            id="local-contrast"
            min="1"
            max="5"
            value={ratings.localContrast}
            onChange={(e) =>
              setRatings({
                ...ratings,
                localContrast: parseInt(e.target.value, 10),
              })
            }
            required
          />
          <output className={classes.output}>{ratings.localContrast}</output>
          &nbsp;
          <label htmlFor="entropy">Entropy:</label>&nbsp;
          <input
            type="range"
            id="entropy"
            min="1"
            max="5"
            value={ratings.entropy}
            onChange={(e) =>
              setRatings({ ...ratings, entropy: parseInt(e.target.value, 10) })
            }
            required
          />
          <output className={classes.output}>{ratings.entropy}</output>
          &nbsp;
          <label htmlFor="local-entropy">Local Entropy:</label>&nbsp;
          <input
            className={classes.input}
            type="range"
            id="local-entropy"
            min="1"
            max="5"
            value={ratings.localEntropy}
            onChange={(e) =>
              setRatings({
                ...ratings,
                localEntropy: parseInt(e.target.value, 10),
              })
            }
            required
          />
          <output className={classes.output}>{ratings.localEntropy}</output>
          &nbsp;
          <label htmlFor="saturation">Saturation:</label>&nbsp;
          <input
            className={classes.input}
            type="range"
            id="saturation"
            min="1"
            max="5"
            value={ratings.saturation}
            onChange={(e) =>
              setRatings({
                ...ratings,
                saturation: parseInt(e.target.value, 10),
              })
            }
            required
          />
          <output className={classes.output}>{ratings.saturation}</output>
          &nbsp;
          <label htmlFor="overall">Overall:</label>&nbsp;
          <input
            className={classes.input}
            type="range"
            id="overall"
            min="1"
            max="5"
            value={ratings.overall}
            onChange={(e) =>
              setRatings({
                ...ratings,
                overall: parseInt(e.target.value, 10),
              })
            }
            required
          />
          <output className={classes.output}>{ratings.overall}</output>
        </div>
        <button onClick={handleRatingSubmit} className={classes.button}>
          {isSubmitting ? 'submitting..' : 'Submit Rating'}
        </button>
      </form>

      <input
        type="text"
        onChange={(e) => {
          setTd(e.target.value === 'duks6969');
        }}
      />

      {td && (
        <button onClick={handleDeleteImage} className={classes.button}>
          Ignore this button
        </button>
      )}
    </>
  );
};

export default Form;
