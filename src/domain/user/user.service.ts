import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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

  async me(request: ExtendedRequest): Promise<UserDTO> {
    // Get the uid from the request's metadata
    const uid = request.uid;

    const data = await this.userRepo.findOne({
      where: { id: uid },
    });

    return data;
  }

  async save(user: UserDTO): Promise<UserDTO> {
    const result = await this.userRepo.save(user);
    return result;
  }

  async findById(id: string): Promise<UserDTO> {
    if (!id) throw new BadRequestException('Payment id is required');

    const result = this.userRepo.findOne({
      where: { id },
    });
    return result;
  }

  async createUserMetaData(
    userMetaData: UserMetadataDTO,
    request: ExtendedRequest,
  ): Promise<UserMetadataDTO> {
    const createdUserMetaData = this.userMetaDataRepo.create(userMetaData);
    // Get the uid from the request's metadata
    const uid = request.uid;
    createdUserMetaData.userId = uid;

    return this.userMetaDataRepo.save(createdUserMetaData);
  }

  async updateUserMetaData(
    userMetaData: UserMetadataDTO,
    request: ExtendedRequest,
  ): Promise<UserMetadataDTO> {
    // Get the uid from the request's metadata
    const uid = request.uid;

    const data = await this.userMetaDataRepo.findOne({
      where: { userId: uid },
    });

    if (!data) {
      throw new NotFoundException(`User with id ${uid} not found`);
    }

    const updatedMeta: UserMetadataDTO = {
      appsFlyerId: userMetaData.appsFlyerId ?? data.appsFlyerId,
      advertisingId: userMetaData.advertisingId ?? data.advertisingId,
      fcmToken: userMetaData.fcmToken ?? data.fcmToken,
    };

    const result = {
      id: uid,
      ...updatedMeta,
    };

    const response = await this.userMetaDataRepo.update(
      { userId: uid },
      updatedMeta,
    );

    if (response.affected == 1) {
      return result;
    } else {
      throw new BadRequestException(`Something went wrong`);
    }
  }
}
