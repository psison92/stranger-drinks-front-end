import { useState } from "react"
// import { useNavigate } from "react-router-dom"


const EditTip = () => {
  const [formData, setFormData] = useState({
    title: '',
    text: ''
  })

  // const handleChange = (e) => {
  //   setFormData({...formData, [e.target.name]: e.target.value})
  // }

  // const handleSubmit= async (e) => {
  //   e.preventDefault()
  //   const tip = await editTip(user.profile, formData)
  //   console.log(tip)
  //   navigate(-1)
  // }

  console.log(formData)

  return(
    <>
    <div>
      <h1>Hello its me</h1>
    </div>
    </>
  )
}

export default EditTip