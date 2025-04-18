# app/models/masters.py
from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


class ProgrammingLanguage(Base):
    __tablename__ = "programming_languages"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    description = Column(String)

    frameworks = relationship("Framework", back_populates="language")


class Framework(Base):
    __tablename__ = "frameworks"

    id = Column(Integer, primary_key=True, index=True)
    language_id = Column(Integer, ForeignKey("programming_languages.id"))
    name = Column(String, nullable=False)
    description = Column(String)

    language = relationship("ProgrammingLanguage", back_populates="frameworks")


class DatabaseType(Base):
    __tablename__ = "database_types"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    description = Column(String)


class FrontendLanguage(Base):
    __tablename__ = "frontend_languages"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    description = Column(String)

    libraries = relationship("FrontendLibrary", back_populates="language")


class FrontendLibrary(Base):
    __tablename__ = "frontend_libraries"

    id = Column(Integer, primary_key=True, index=True)
    language_id = Column(Integer, ForeignKey("frontend_languages.id"))
    name = Column(String, nullable=False)
    description = Column(String)

    language = relationship("FrontendLanguage", back_populates="libraries")
