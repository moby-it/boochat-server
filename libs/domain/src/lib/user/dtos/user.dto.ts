export interface UserDto {
  id: string;
  name: string;
  imageUrl: string;
}
export interface CreateUserDto extends UserDto {}
