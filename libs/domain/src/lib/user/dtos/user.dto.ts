export interface UserDto {
  id: string;
  name: string;
  imageUrl: string;
  email: string;
}
export interface CreateUserDto extends UserDto {}
