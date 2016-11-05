using LuminosityWebAPI.Domain;
using LuminosityWebAPI.Infra.DataContexts;
using System;
using System.Data;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace LuminosityWebAPI.Api.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    [RoutePrefix("api/v1/public")]
    public class VeiculoController : ApiController
    {
        private LuminosityWebApiDataContext db = new LuminosityWebApiDataContext();

        // Listar todos
        [Route("veiculos")]
        public HttpResponseMessage GetVeiculos()
        {
            var result = db.Veiculos.ToList();
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        // Listagem de veículos com base no status
        [Route("veiculos")]
        public HttpResponseMessage GetVeiculos(String status)
        {
            if (status == "")
                return Request.CreateResponse(HttpStatusCode.BadRequest);

            var result = db.Veiculos.Where(x => x.VEI_STR_STATUS == status).ToList();

            if (result != null)
                return Request.CreateResponse(HttpStatusCode.OK, result);

            return Request.CreateResponse(HttpStatusCode.BadRequest, "Não foi possível recuperar a listagem de veículos solicitada");
        }

        // Adicionar Novo
        [HttpPost]
        [Route("veiculos")]
        public HttpResponseMessage PostVeiculo(Veiculo veiculo)
        {
            if (veiculo == null)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
            try
            {
                db.Veiculos.Add(veiculo);
                db.SaveChanges();

                var result = veiculo;
                return Request.CreateResponse(HttpStatusCode.OK, result);
            }
            catch
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, "Falha ao incluir Veiculo, verifique as informações digitadas.");
            }
        }

        // Alterar
        [HttpPut]
        [Route("veiculos")]
        public HttpResponseMessage PutVeiculo(Veiculo veiculo)
        {
            if (veiculo == null)
                return Request.CreateResponse(HttpStatusCode.BadRequest);

            try
            {
                db.Entry<Veiculo>(veiculo).State = System.Data.Entity.EntityState.Modified;
                db.SaveChanges();

                var result = veiculo;
                return Request.CreateResponse(HttpStatusCode.OK, result);
            }
            catch
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, "Falha ao alterar Veiculo, verifique as informações digitadas.");
            }
        }

        // Delete
        [HttpDelete]
        [Route("veiculos")]
        public HttpResponseMessage DeleteVeiculo(int veiculoId)
        {

            if (veiculoId <= 0)
                return Request.CreateResponse(HttpStatusCode.BadRequest);

            try
            {
                db.Veiculos.Remove(db.Veiculos.Find(veiculoId));
                db.SaveChanges();

                return Request.CreateResponse(HttpStatusCode.OK, "Veiculo excluido.");
            }
            catch
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, "Falha ao excluir Veiculo.");
            }

        }

    }
}
