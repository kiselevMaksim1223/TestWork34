import styles from './styles.module.scss'

export const Skeleton = () => {
  return (
    <div
      className={`card mt-4 shadow-lg border-0 p-4 ${styles.cardBackground}`}
    >
      <div className={'row align-items-center g-4'}>
        <div className={'col-md-4 text-center'}>
          <div
            className={
              'placeholder bg-secondary rounded-3 img-fluid d-block mx-auto mb-3'
            }
            style={{ width: '100px', height: '100px' }}
          ></div>

          <p className={'placeholder-glow mb-3'}>
            <span className={'placeholder col-6'}></span>
          </p>

          <div className={'d-grid'}>
            <span
              className={
                'placeholder btn btn-outline-secondary disabled col-8 mx-auto'
              }
            ></span>
          </div>
        </div>

        <div className={'col-md-8'}>
          <p className={'placeholder-glow'}>
            <span className={'placeholder col-5'}></span>
          </p>

          <p className={'placeholder-glow mb-3'}>
            <span className={'placeholder col-7'}></span>
            <br />
            <span className={'placeholder col-6'}></span>
          </p>

          <div className={'d-flex flex-wrap gap-3 justify-content-center mb-4'}>
            <span className={'placeholder col-3'}></span>
            <span className={'placeholder col-3'}></span>
            <span className={'placeholder col-4'}></span>
          </div>

          <div className={'d-flex justify-content-end'}>
            <span
              className={'placeholder btn btn-outline-warning disabled col-4'}
            ></span>
          </div>
        </div>
      </div>
    </div>
  )
}
