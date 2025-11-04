import ImageHolder from "../../features/auth/image-holder/ImageHolder"
import PersonalInfoForm from "../../features/auth/personal-info-form/PersonalInfoForm"

function PersonalInfo() {
  return (
    <div className="illustrator__container container">
      <PersonalInfoForm />
      <ImageHolder />
    </div>
  )
}

export default PersonalInfo