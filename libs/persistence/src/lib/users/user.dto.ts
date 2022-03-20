export interface UserDto {
  id?: string;
  googleId: string;
  name: string;
  imageUrl: string;
}
export interface CreateUserDto extends UserDto {

}
