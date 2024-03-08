import axios from "axios";
import { useEffect, useState } from "react";


export const VidCard = (props) => {
  const { vidLink, stkids, title } = props;

  const symbols = (stkids.map(stk => stk[0]));

  const [pricesObj, setpricesObj] = useState({});

  const getPrices = async (symbols) => {
    console.log('Fetching Prices...');
    try {
      const res = await axios.get(`https://api.twelvedata.com/price?symbol=${symbols.toString()}&country=India&apikey=e2eae8c50f9a4deda2c5c37ec2a19b2e`);
      if(res.data.code === 429){
        throw new Error('API limit reached');
      }
      let fres = {};
      if(symbols.length == 1){
        let key = symbols[0];
        fres[key] = parseFloat(res.data.price)
      } else if(symbols.length > 1){
        for(let key in res.data){
          fres[key] = parseFloat(res.data[key].price)
        }
      }
      // console.log(res.data)
      // console.log(fres)
      setpricesObj(fres);
    } catch (error) {
      console.log(`Failed to fetch prices: ${error.message}`);
    }
  }

  useEffect(() => {
    getPrices(symbols);
  },[])

  return (
    <div className='m-4 p-2 rounded-xl bg-slate-200 shadow-2xl'>
      <div className='pb-4 flex gap-4'>
        <p className=' text-3xl font-semibold mx-16 my-4'>{title}</p>
        {/* <button onClick={() => getPrices(['HAL'])}>Prices</button> */}
      </div>
      <div>
        <div className='flex justify-between gap-24'>
          <div className='ml-16 rounded-lg overflow-hidden flex-1'>
            <iframe width="500" height="320" src={vidLink} title="Youtube Video Player" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
          </div>
          <div className='mr-24 bg-slate-300 w-[650px] rounded-lg flex-1 max-h-[320px] overflow-y-scroll'>
            <p className='mx-4 text-2xl font-semibold'>Stocks predicted in this video</p>
            <div className='flex flex-col justify-center items-center gap-2 m-4'>
              <div className='flex justify-around p-3 gap-2 bg-slate-400 w-[500px] rounded-md font-medium'>
                <p className=' w-20'>Symbol</p>
                <p className=' w-20'>Old Price</p>
                <p className=' w-20'>Curr Price</p>
                <p className=' w-20'>Change</p>
              </div>
                {
                  stkids.map((stk) => {

                    const curPrice = pricesObj[stk[0]] || 'N/A';
                    const change = (parseFloat(stk[1]) - curPrice).toFixed(2) || 'N/A';

                    return (
                      <div key={stk[0]} className='flex justify-around py-3 gap-2 bg-slate-200 w-[500px] rounded-md'>
                        <p className=' w-12'>{stk[0]}</p>
                        <p className=' w-12'>{stk[1]}</p>
                        <p className=' w-12'>{`$ ${curPrice}`}</p>
                        <p className=' w-12'>{`${change}`}</p>
                      </div>
                    )
                  })
                }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}