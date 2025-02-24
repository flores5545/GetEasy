import { useEffect, useState, useContext, React } from 'react';
import styles from '../../styles/Items.module.css';
import apiService from '../../utils/api-service';
import Image from 'next/image';
import nextIcon from '../../public/images/next.svg';
import { UserContext } from '../../context/user-context';
import { useRouter } from 'next/router';

export default function Item ({ item }) {
  const router = useRouter();
  const [pointA, setPointA] = useState([]);
  const [pointB, setPointB] = useState([]);
  const { itemState, setItem } = useContext(UserContext);

  useEffect(() => {
    for (let i = 0; i < item.addresses.length; i++) {
      if (item.addresses[i].pickUp !== null) {
        setPointA(item.addresses[i].pickUp);
        setPointB(item.addresses[i].dropOff);
      } else {
        apiService
          .getPlaceNames(item.addresses[i].lat, item.addresses[i].lng)
          .then((data) => {
            if (i === 0) setPointA(data);
            if (i === 1) setPointB(data);
          });
      }
    }
  }, []);

  function onClickHandler () {
    setItem(item);
    router.replace('/details/details');
  }

  return (
    <div className={styles.item_card}>
      <Image
        id="view-arrow"
        className={styles.btn_details}
        src={nextIcon}
        alt="next button image"
        onClick={() => onClickHandler()}
      />
      <div className={styles.title_description_container}>
        <div className={styles.name}>
          <h2 className={styles.tag}>
            <strong>Name:</strong>
          </h2>
          <h2 className={styles.tag_text}>{item.name}</h2>
        </div>
        <div className={styles.description}>
          <h2 className={styles.tag}>
            <strong>Description:</strong>
          </h2>
          <h2 className={styles.tag_text}>{item.description}</h2>
        </div>
      </div>
      <div className={styles.destination_container}>
        <div className={styles.address_holder}>
          <figcaption>Pick up:</figcaption>
          <p>
            {pointA?.results ? pointA?.results[0]?.formatted_address : pointA}
          </p>
        </div>

        <div className={styles.path_icon}>
          <p className={styles.arrow}>&rarr;</p>
        </div>

        <div className={styles.address_holder}>
          <figcaption>Drop off:</figcaption>
          <p>
            {pointB?.results ? pointB?.results[0]?.formatted_address : pointB}
          </p>
        </div>
      </div>
    </div>
  );
}
