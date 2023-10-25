import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import rocketImg from '../../assets/rocket.svg'
import './NewVersion.css'
import { useDispatch, useSelector } from 'react-redux';
import { alertChecked } from '../../../slices/checkVerify';
export default function NewVersionAlert() {
  const alertShows=useSelector(state=>state.checkedVerifys.alertShow)
  const dispatch=useDispatch()
  return (
    <Modal
      className='new-version-alert'
      show={alertShows}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
      <div>
        <img src={rocketImg} alt='rocket' className='rocket-image' />
      </div>
      <div className='para-content'>
       <div className='version-heading'>New Version</div>
        <div><span>With this new version, you will be able to access the below feature -</span></div>
          <ul>
            <li>Update to improve localization across the app</li>
             <li>Various bug fixed & improvements</li>
          </ul>
       
          
        <Modal.Footer>
          <Button
           variant='dark'
           type='submit'
           className='close-alert'
           onClick={() => dispatch(alertChecked(false))}>
            <svg width='14' height='10' viewBox='0 0 14 10' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path d='M14 1.75L7.30625 8.25L5.46875 10L0 4.70833L1.8375 2.95833L5.46875 6.5L12.1625 0L14 1.75Z' fill='white' />
            </svg>
            <span className='button-para'>OK</span>
          </Button>
        </Modal.Footer>
      </div>

    </Modal>
  );
}


