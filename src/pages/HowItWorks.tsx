import arrowBlue from '../assets/arrowBlue.webp'

const HowItWorks = () => {
  return (
    <div>
      <div>
        <h1 className="sm:text-5xl text-4xl font-bold text-center my-8 text-secondaryDarkBlue">
          Votre réservation <br />
          en 6 étapes
        </h1>
      </div>
      <div className="grid grid-cols-3 grid-rows-6 gap-2 max-w-[775px] m-auto">
        <div className="m-auto col-start-2 sm:w-60 w-32 flex-col bg-slate-400ol flex items-center text-center bg-slate-400">
          <div className="bg-slate-100 w-full text-4xl font-bold">1</div>
          <div>
            <div>icone</div>
            <div>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum,
              vel.
            </div>
          </div>
        </div>
        <div className="m-auto col-start-2 row-start-2 sm:w-60 w-32 flex-col flex items-center text-center bg-slate-400">
          {' '}
          <div className="bg-slate-100 w-full text-4xl font-bold">2</div>
          <div>
            <div>icone</div>
            <div>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum,
              vel.
            </div>
          </div>
        </div>
        <div className="m-auto col-start-2 row-start-3 sm:w-60 w-32 flex-col flex items-center text-center bg-slate-400">
          {' '}
          <div className="bg-slate-100 w-full text-4xl font-bold">3</div>
          <div>
            <div>icone</div>
            <div>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum,
              vel.
            </div>
          </div>
        </div>
        <div className="relative m-auto col-start-2 row-start-4 sm:w-60 w-32 flex-col flex items-center text-center bg-slate-400">
          <img
            src={arrowBlue}
            alt=""
            className="w-20 absolute left-0 top-36 transform -translate-x-full -translate-y-1/2"
          />
          <div className="bg-slate-100 w-full text-4xl font-bold">4</div>
          <div>
            <div>icone</div>
            <div>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum,
              vel.
            </div>
          </div>
          <img
            src={arrowBlue}
            alt=""
            className="w-20 absolute right-0 top-36 transform translate-x-full -translate-y-1/2 scale-x-[-1]"
          />
        </div>
        <div className="m-auto col-start-3 row-start-4 sm:w-60 w-32 flex-col flex items-center text-center bg-slate-400"></div>
        <div className="m-auto col-start-1 row-start-4 sm:w-60 gap-1 w-32 flex-col flex items-center text-center"></div>
        <div className="m-auto row-start-5 sm:w-60 w-32 flex-col flex items-center text-center bg-slate-400 mt-6 sm:mt-12">
          {' '}
          <div className="bg-slate-100 w-full text-4xl font-bold">5</div>
          <div>
            <div>icone</div>
            <div>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum,
              vel.
            </div>
          </div>
        </div>
        <div className="m-auto col-start-1 row-start-6 sm:w-60 w-32 flex-col flex items-center text-center bg-slate-400">
          {' '}
          <div className="bg-slate-100 w-full text-4xl font-bold">6</div>
          <div>
            <div>icone</div>
            <div>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum,
              vel.
            </div>
          </div>
        </div>
        <p className="m-auto row-start-4 col-start-3">Absent ?</p>
        <p className="m-auto row-start-4 col-start-1">Présent ?</p>
        <div className="m-auto col-start-3 row-start-5 sm:w-60 w-32 flex-col flex items-center text-center bg-slate-400  mt-6 sm:mt-12">
          {' '}
          <div className="bg-slate-100 w-full text-4xl font-bold">5</div>
          <div>
            <div>icone</div>
            <div>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum,
              vel.
            </div>
          </div>
        </div>
        <div className="m-auto col-start-3 row-start-6 sm:w-60 w-32 flex-col flex items-center text-center bg-slate-400">
          {' '}
          <div className="bg-slate-100 w-full text-4xl font-bold">6</div>
          <div>
            <div>icone</div>
            <div>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rerum,
              vel.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HowItWorks
