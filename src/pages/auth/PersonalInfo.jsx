import ImageHolder from "../../features/auth/image-holder/ImageHolder"
import PersonalInfoForm from "../../features/auth/personal-info-form/PersonalInfoForm"
import illustrator from "../../assets/auth/personal.svg"
function PersonalInfo() {
  return (
    <div className="illustrator__container container">
      <PersonalInfoForm />
      <ImageHolder illustrator={illustrator}/>
    </div>
  )
}

export default PersonalInfo