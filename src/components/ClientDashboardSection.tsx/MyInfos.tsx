import { useAppSelector } from '../../redux/hooks'

export const MyInfos = () => {
  const user = useAppSelector((state) => state.user)

  return (
    <div className="flex flex-col gap-4  my-8">
      <div className="flex gap-6 font-extralight">
        <div className="">
          <p>Nom</p>
          <p>Prénom</p>
          <p>Email</p>
        </div>
        <div>
          <p>{user.name}</p>
          <p>{user.firstName}</p>
          <p>{user.email}</p>
        </div>
      </div>
    </div>
  )
}
