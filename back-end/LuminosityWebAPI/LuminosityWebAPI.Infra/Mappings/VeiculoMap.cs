using LuminosityWebAPI.Domain;
using System.Data.Entity.ModelConfiguration;

namespace LuminosityWebAPI.Infra.Mappings
{
    class VeiculoMap : EntityTypeConfiguration<Veiculo>
    {
        public VeiculoMap()
        {
            ToTable("Veiculo");

            HasKey(x => x.VEI_INT_ID);
            Property(x => x.VEI_STR_MODELO).HasMaxLength(20).IsRequired();
            Property(x => x.VEI_STR_MARCA).HasMaxLength(20).IsRequired();
            Property(x => x.VEI_STR_KM).HasMaxLength(20).IsRequired();
            Property(x => x.VEI_DAT_ANO).IsRequired();
            Property(x => x.VEI_STR_PLACA).HasMaxLength(10).IsRequired();
            Property(x => x.VEI_DAT_REGISTRO).IsRequired();
            Property(x => x.VEI_STR_STATUS).HasMaxLength(1).IsRequired();

        }

    }
}
