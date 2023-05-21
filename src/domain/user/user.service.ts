import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity, UserMetadataEntity } from '../../typeorm';
import { Repository } from 'typeorm';
import { UserDTO, UserMetadataDTO } from './dto/user.dto';
import { ExtendedRequest } from '../../common/extended-request';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
    @InjectRepository(UserMetadataEntity)
    private readonly userMetaDataRepo: Repository<UserMetadataEntity>,
  ) {}

  async createUser(user: UserDTO, request: ExtendedRequest): Promise<UserDTO> {
    const createdUser = this.userRepo.create(user);
    // Get the uid from the request's metadata
    const uid = request.uid;
    createdUser.id = uid;

    return this.userRepo.save(createdUser);
  }

  async getUsers(): Promise<UserDTO[]> {
    return this.userRepo.find();
  }

  async getUserById(userId: string): Promise<any> {
    return this.userRepo.findOne({
      where: { id: userId },
    });
  }

  async createUserMetaData(
    userMetaData: UserMetadataDTO,
  ): Promise<UserMetadataDTO> {
    const createdUserMetaData = this.userMetaDataRepo.create(userMetaData);
    return this.userMetaDataRepo.save(createdUserMetaData);
  }

  async updateUserMetaData(
    id: string,
    userMetaData: UserMetadataDTO,
    request: ExtendedRequest,
  ): Promise<UserMetadataDTO> {
    // Get the uid from the request's metadata
    const uid = request.uid;

    const updatedUserMetaData = await this.userMetaDataRepo.findOne({
      where: { id },
    });
    updatedUserMetaData.appsFlyerId =
      userMetaData.appsFlyerId ?? updatedUserMetaData.appsFlyerId;
    updatedUserMetaData.advertisingId =
      userMetaData.advertisingId ?? updatedUserMetaData.advertisingId;
    updatedUserMetaData.fcmToken =
      userMetaData.fcmToken ?? updatedUserMetaData.fcmToken;
    updatedUserMetaData.userId = uid;
    return this.userMetaDataRepo.save(updatedUserMetaData);
  }
}
