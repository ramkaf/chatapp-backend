import { Logger, NotFoundException } from "@nestjs/common";
import { FilterQuery, Model, Types, UpdateQuery } from "mongoose";
import { AbstractEntity } from "./abstract.entity";

export abstract class AbstractRespository<T extends AbstractEntity> {
    protected abstract readonly logger:Logger;

    private ensureObjectId(filterQuery: FilterQuery<T>): FilterQuery<T> {
  
      if (filterQuery._id && typeof filterQuery._id === 'string') {
        filterQuery._id = new Types.ObjectId(filterQuery._id) as any;
      }
      return filterQuery;
    }
    constructor(protected readonly model:Model<T>){}

    async create (document: Omit<T , '_id'>):Promise<T> {
        const createDocument = new this.model ({
            ...document,
            _id: new Types.ObjectId
        })
        return (await createDocument.save()).toJSON() as unknown as T
    }

    async findOne(filterQuery: FilterQuery<T>): Promise<T> {
      const updatedQuery = this.ensureObjectId(filterQuery);
      const document = await this.model.findOne(updatedQuery, {}).lean<T>();
  
      if (!document) {
        this.logger.warn('Document was not found with filterQuery', updatedQuery);
        throw new NotFoundException('Document not found.');
      }
  
      return document;
    }

    async find(filterQuery:FilterQuery<T>):Promise<T[]> {
        return this.model.find(filterQuery, {} , {lean:true}) as unknown as T[]
    }

    async findOneAndUpdate(
        filterQuery: FilterQuery<T>,
        update: UpdateQuery<T>,
      ): Promise<T> {
       filterQuery = this.ensureObjectId(filterQuery)

        const document = await this.model
          .findOneAndUpdate(filterQuery, update, {
            new: true,
          })
          .lean<T>();
    
        if (!document) {
          this.logger.warn('Document was not found with filterQuery', filterQuery);
          throw new NotFoundException('Document not found.');
        }
    
        return document;
      }
    
    async findOneAndDelete (filterQuery:FilterQuery<T>):Promise<T>{
        filterQuery = this.ensureObjectId(filterQuery);
        return this.model.findOneAndDelete(filterQuery , {lean: true}) as unknown as T
    }
}