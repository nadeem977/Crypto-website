import React, { useContext, useLayoutEffect ,useState} from 'react'
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { CryptoContext } from '../context/CryptoContext';



const Chartrander = ({data ,currency ,type}) =>{


  function CustomTooltip({ payload, label, active ,currency}) {
    if (active) {
      return (
        <div className="custom-tooltip">
          <p className="label text-sm font-bold text-cyan">{`${label} : ${
            
            new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: currency,
              minimumFractionDigits: 5,
            }).format(payload[0].value)}`}</p> 
        </div>
      );
    }
  
    return null;
  }


  return(
    
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data}>
        <Line type="monotone" dataKey={type} stroke="#14ffec" strokeWidth={1} />
        <XAxis dataKey="date" />
        <YAxis dataKey={type} hide domain={['auto','auto']} />
        <Tooltip content={<CustomTooltip />} currency={currency} cursor={false}/>
        <Legend/>
      </LineChart>
    </ResponsiveContainer>
  );
}


const Chart = ({id}) => {

const {currency} = useContext(CryptoContext)
const[chartdata ,setChartdata] = useState(null)
const [type ,setType] = useState("prices")
const[days , setDays] = useState(7)

  useLayoutEffect(() => {
    const getapidata = async () => {
      try {
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}&interval=24&precision=daliy`);
        const data = response.data;
        const convertdateobj = data[type].map(item => {
          return{
            date:new Date(item[0]).toLocaleDateString(),
            [type]:item[1]
          }
         }
        )
        setChartdata(convertdateobj)
      } catch (error) {
        console.log(error, 'the error message');
      }
    }  
    getapidata()
  },[id,type,days])


  return (
      <div> 
      <Chartrander data={chartdata} currency={currency} type={type}/>
      <div className='btn-chart flex items-center gap-3'>
      <button className={`px-2 py-1  text-cyan rounded ${type === 'prices' ? 'bg-opacity-25 bg-cyan text-cyan':"bg-gray-200"}`} onClick={()=>setType("prices")}>Prices</button>
      <button className={`px-2 py-1  text-cyan rounded ${type === 'market_caps' ? 'bg-opacity-25 bg-cyan text-cyan':"bg-gray-200"}`} onClick={()=>setType("market_caps")}>Market Cap</button>
      <button className={`px-2 py-1  text-cyan rounded ${type === 'total_volumes' ? 'bg-opacity-25 bg-cyan text-cyan':"bg-gray-200"}`}onClick={()=>setType("total_volumes")}>Total Volumes</button>
      <button className={`px-2 py-1 text-cyan rounded ${days === 7 ? 'bg-opacity-25 bg-cyan text-cyan' : 'bg-gray-200'}`} onClick={() => setDays(7)}>7d</button>
      <button className={`px-2 py-1  text-cyan rounded ${days === 15 ? 'bg-opacity-25 bg-cyan text-cyan':"bg-gray-200"}`}onClick={()=>setDays(15)}>15d</button>
      <button className={`px-2 py-1 text-cyan rounded ${days === 30 ? 'bg-opacity-25 bg-cyan text-cyan' : 'bg-gray-200'}`} onClick={() => setDays(30)}>30d</button>

      </div>
      </div>
  )
}

export default Chart