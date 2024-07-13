from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, AllowAny
from .serializers import UserSerializer, LaporanSerializer
from .models import Laporan


# create your views here.
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]


class ListLaporanView(generics.ListAPIView):
    queryset = Laporan.objects.all()
    serializer_class = LaporanSerializer
    permission_classes = [IsAuthenticated]

class CreateLaporanView(generics.CreateAPIView):
    queryset = Laporan.objects.all()
    serializer_class = LaporanSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):

        # get all laporan 
        laporan_list = Laporan.objects.all()

        # if there is no laporan
        if len(laporan_list) == 0:
            serializer.save(kepatuhan = 100)
            return

        # get max_pendapatan
        max_pendapatan = max(laporan_list, key=lambda x: x.pendapatan).pendapatan
        
        # check if current pendapatan is greater than max_pendapatan
        if serializer.validated_data['pendapatan'] > max_pendapatan:

            # update max pendapatan
            max_pendapatan = serializer.validated_data['pendapatan']
            
            # update all Laporan compliance score with SAW method
            for laporan in laporan_list:
                laporan.kepatuhan = laporan.pendapatan / max_pendapatan * 100
                laporan.save()

            # update the compliance score to 0
            serializer.save(kepatuhan = 100)

        # if current pendapatan is less than max_pendapatan, only update the current laporan
        else:
            serializer.save(kepatuhan = serializer.validated_data['pendapatan'] / max_pendapatan * 100)


class DeleteLaporanView(generics.DestroyAPIView):
    queryset = Laporan.objects.all()
    serializer_class = LaporanSerializer
    permission_classes = [IsAuthenticated]

    # when data is deleted, update compliance score
    def perform_destroy(self, instance):
        
        # get all laporan
        laporan_list = Laporan.objects.all()

        # get max pendapatan
        max_pendapatan = max(laporan_list, key=lambda x: x.pendapatan).pendapatan

        # delete instance
        instance.delete()

        # check if instance kepatuhan is 100
        if instance.pendapatan == max_pendapatan:
            
            # get all laporan
            laporan_list = Laporan.objects.all()
            if len(laporan_list) == 0:
                return

            # get the max pendapatan outside the instance
            max_pendapatan = max(laporan_list, key=lambda x: x.pendapatan).pendapatan

            # update compliance score
            for laporan in laporan_list:
                laporan.kepatuhan = laporan.pendapatan / max_pendapatan * 100
                laporan.save()