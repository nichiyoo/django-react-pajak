from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Laporan


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "password",
        ]
        extra_kwargs = {
            "password": {
                "write_only": True,
            },
        }

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)


class LaporanSerializer(serializers.ModelSerializer):
    class Meta:
        model = Laporan
        fields = [
            "id",
            "kpp",
            "wp",
            "spt",
            "status",
            "kanal",
            "kategori",
            "bulan",
            "tahun",
            "nama",
            "npwp",
            "pendapatan",
            "kepatuhan",
            "created_at",
            "updated_at",
        ]
        extra_kwargs = {
            "kepatuhan": {
                "read_only": True,
            },
            "created_at": {
                "read_only": True,
            },
            "updated_at": {
                "read_only": True,
            },
        }
