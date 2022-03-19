export interface UserDto {
  id?: string;
  googleId: string;
  name: string;
}
export interface CreateUserDto extends UserDto {

}
