const axios = require('axios')

function bookSearchApi(requestOptions){
    return Promise.all(requestOptions.map(req=>{
        return axios({
            method: 'get',
            url:req.url,
            headers: {}
        })
        .then(result =>{
            console.log(result.data)
            return result.data
        }).catch(err =>{
                console.log(err)
        })
    }))
}

exports.searchBook = async (req,res)=>{
    try{
        const {isbn} = req.query
        const requests = []
        let url1 = {api1:`${process.env.BOOKIE_URL}`+'books/'+`${isbn}`+'/details?key='+`${process.env.KEY}`}
        let url2 = {api2:`${process.env.INFO_URL}`+'search?isbn='+`${isbn}`}
        requests.push(url1,url2)
        let data = await bookSearchApi(requests)
        console.log(data)
    }
    catch (err){
        res.send({success:'false',message:err.message})
    }
}